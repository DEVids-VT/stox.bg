'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function ContactForm() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };
  
  if (isSubmitted) {
    return (
      <div className="rounded-md bg-green-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-green-800">Message sent successfully</h3>
            <div className="mt-2 text-sm text-green-700">
              <p>Thank you for reaching out! We'll get back to you soon.</p>
            </div>
            <div className="mt-4">
              <Button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setFormState({ name: '', email: '', message: '' });
                }}
              >
                Send another message
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-semibold leading-6 text-gray-900">
          Name
        </label>
        <div className="mt-2.5">
          <input
            type="text"
            name="name"
            id="name"
            required
            value={formState.name}
            onChange={handleChange}
            autoComplete="given-name"
            className="block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
          Email
        </label>
        <div className="mt-2.5">
          <input
            type="email"
            name="email"
            id="email"
            required
            value={formState.email}
            onChange={handleChange}
            autoComplete="email"
            className="block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
          Message
        </label>
        <div className="mt-2.5">
          <textarea
            name="message"
            id="message"
            required
            value={formState.message}
            onChange={handleChange}
            rows={4}
            className="block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div>
        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send message'}
        </Button>
      </div>
    </form>
  );
} 