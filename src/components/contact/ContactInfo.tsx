import {
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";

export function ContactInfo() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>

      <div className="space-y-8">
        <div className="flex items-start">
          <MapPinIcon className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
          <div className="ml-4">
            <h3 className="font-semibold mb-1">Office Location</h3>
            <p className="text-gray-600">
              123 Solar Street<br />
              Tampa, FL 33601
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <PhoneIcon className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
          <div className="ml-4">
            <h3 className="font-semibold mb-1">Phone</h3>
            <p className="text-gray-600">
              <a href="tel:+18135551234" className="hover:text-primary">
                (813) 555-1234
              </a>
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <EnvelopeIcon className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
          <div className="ml-4">
            <h3 className="font-semibold mb-1">Email</h3>
            <p className="text-gray-600">
              <a
                href="mailto:info@aaronflorida.solar"
                className="hover:text-primary"
              >
                info@aaronflorida.solar
              </a>
            </p>
          </div>
        </div>

        <div className="pt-8">
          <h3 className="font-semibold mb-2">Business Hours</h3>
          <table className="text-gray-600">
            <tbody>
              <tr>
                <td className="pr-4">Monday - Friday:</td>
                <td>9:00 AM - 6:00 PM</td>
              </tr>
              <tr>
                <td className="pr-4">Saturday:</td>
                <td>10:00 AM - 4:00 PM</td>
              </tr>
              <tr>
                <td className="pr-4">Sunday:</td>
                <td>Closed</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
