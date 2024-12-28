type ExperimentVariant = "control" | "variant-a" | "variant-b";

interface Experiment {
  id: string;
  variants: ExperimentVariant[];
  weights?: number[];
}

const EXPERIMENTS = {
  "maintenance-form-layout": {
    id: "maintenance-form-layout",
    variants: ["control", "variant-a", "variant-b"],
    weights: [0.34, 0.33, 0.33],
  },
  "offer-display": {
    id: "offer-display",
    variants: ["control", "variant-a"],
    weights: [0.5, 0.5],
  },
} as const;

export type ExperimentId = keyof typeof EXPERIMENTS;

export class ExperimentManager {
  private static instance: ExperimentManager;
  private assignments: Map<string, ExperimentVariant> = new Map();

  private constructor() {
    this.loadAssignments();
  }

  static getInstance(): ExperimentManager {
    if (!ExperimentManager.instance) {
      ExperimentManager.instance = new ExperimentManager();
    }
    return ExperimentManager.instance;
  }

  private loadAssignments() {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem("experiment_assignments");
    if (stored) {
      this.assignments = new Map(JSON.parse(stored));
    }
  }

  private saveAssignments() {
    if (typeof window === "undefined") return;

    localStorage.setItem(
      "experiment_assignments",
      JSON.stringify(Array.from(this.assignments.entries()))
    );
  }

  getVariant(experimentId: ExperimentId): ExperimentVariant {
    const existing = this.assignments.get(experimentId);
    if (existing) return existing;

    const experiment = EXPERIMENTS[experimentId];
    const variant = this.assignVariant(experiment);

    this.assignments.set(experimentId, variant);
    this.saveAssignments();

    return variant;
  }

  private assignVariant(experiment: Experiment): ExperimentVariant {
    const weights =
      experiment.weights ||
      experiment.variants.map(() => 1 / experiment.variants.length);
    const random = Math.random();
    let sum = 0;

    for (let i = 0; i < weights.length; i++) {
      sum += weights[i];
      if (random < sum) {
        return experiment.variants[i];
      }
    }

    return experiment.variants[0];
  }
}
