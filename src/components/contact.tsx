import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Facebook, Mail, Phone } from 'lucide-react'

export function Contact() {
  return (
    <section className="py-20 bg-zinc-800">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-yellow-400">Contact Us</h2>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-zinc-200">
                <Phone className="w-5 h-5 text-yellow-400" />
                <span>(321) 506-2981</span>
              </div>
              <div className="flex items-center space-x-2 text-zinc-200">
                <Mail className="w-5 h-5 text-yellow-400" />
                <span>A.A.RonsHomeImprovement321@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2 text-zinc-200">
                <Facebook className="w-5 h-5 text-yellow-400" />
                <span>A A-Ron&apos;s Home Repair and Renovations</span>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <form className="space-y-4">
              <Input placeholder="Name" className="bg-zinc-900 border-yellow-400/20" />
              <Input placeholder="Email" type="email" className="bg-zinc-900 border-yellow-400/20" />
              <Input placeholder="Phone" type="tel" className="bg-zinc-900 border-yellow-400/20" />
              <Textarea
                placeholder="Message"
                className="min-h-[100px] bg-zinc-900 border-yellow-400/20"
              />
              <Button className="w-full bg-yellow-400 text-zinc-900 hover:bg-yellow-500">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

