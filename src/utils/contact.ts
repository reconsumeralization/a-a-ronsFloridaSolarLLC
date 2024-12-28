interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  propertyType: "residential" | "commercial" | "other";
}

export async function submitContactForm(data: ContactFormData): Promise<void> {
  // In a real app, this would send the data to your backend
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulate API call
  if (Math.random() > 0.9) {
    throw new Error("Random error simulation");
  }

  // You would typically make an API call here
  console.log("Form submitted:", data);
}
