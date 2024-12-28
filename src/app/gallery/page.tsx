'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X } from 'lucide-react'
import Image from "next/image"

const projects = [
  {
    title: "Solar Panel Cleaning",
    description: "Professional cleaning of residential solar installation",
    image: "/placeholder.svg?height=400&width=600"
  },
  {
    title: "Pool Solar Maintenance",
    description: "Regular maintenance of pool solar heating system",
    image: "/placeholder.svg?height=400&width=600"
  },
  {
    title: "System Repair",
    description: "Emergency repair of damaged solar components",
    image: "/placeholder.svg?height=400&width=600"
  },
  {
    title: "Installation Check",
    description: "Post-installation inspection and optimization",
    image: "/placeholder.svg?height=400&width=600"
  },
  {
    title: "Preventive Maintenance",
    description: "Regular system health check and cleaning",
    image: "/placeholder.svg?height=400&width=600"
  },
  {
    title: "Performance Optimization",
    description: "System adjustment for maximum efficiency",
    image: "/placeholder.svg?height=400&width=600"
  }
]

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gradient-primary py-12">
      <div className="container px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-12"
        >
          <div className="space-y-4 text-center">
            <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl">Our Work</h1>
            <p className="mx-auto max-w-[700px] text-zinc-200 md:text-xl">
              Browse through our portfolio of solar maintenance and repair projects
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card 
                  className="bg-card-secondary border-highlight overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:scale-105"
                  onClick={() => setSelectedImage(project.image)}
                >
                  <div className="relative h-48 w-full">
                    <Image
                      src={project.image}
                      alt={project.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-xl font-bold text-white">{project.title}</h3>
                    <p className="text-zinc-300">{project.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-3xl max-h-[80vh] overflow-hidden rounded-lg"
            >
              <Image
                src={selectedImage}
                alt="Enlarged project image"
                width={800}
                height={600}
                objectFit="contain"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 text-white hover:bg-white/20"
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedImage(null)
                }}
              >
                <X className="h-6 w-6" />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

