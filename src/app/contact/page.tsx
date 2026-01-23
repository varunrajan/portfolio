import Section from '@/components/Section';
import Card from '@/components/Card';
import Button from '@/components/Button';

export default function Contact() {
  return (
    <>
      <Section className="bg-white">
        <div className="max-w-2xl mx-auto text-center py-xl">
          <h1 className="text-4xl font-bold text-neutral-900 mb-md">
            Get In Touch
          </h1>
          <p className="text-xl text-neutral-600 mb-lg">
            Have a project in mind? Let's discuss how we can work together.
          </p>
        </div>
      </Section>

      <Section className="bg-neutral-50">
        <div className="max-w-2xl mx-auto">
          <Card>
            <form className="space-y-lg">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-sm">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-md py-sm border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-sm">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-md py-sm border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-sm">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  className="w-full px-md py-sm border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>

              <div>
                <Button type="submit" variant="primary" className="w-full sm:w-auto">
                  Send Message
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </Section>
    </>
  );
}
