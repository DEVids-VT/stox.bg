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
      <div className="rounded-md bg-primary/10 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <span className="h-5 w-5 bg-primary rounded-full inline-block"></span>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-primary">Съобщението е изпратено успешно</h3>
            <div className="mt-2 text-sm text-primary/80">
              <p>Благодарим ви, че се свързахте с нас! Ще се свържем с вас скоро.</p>
            </div>
            <div className="mt-4">
              <Button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setFormState({ name: '', email: '', message: '' });
                }}
              >
                Изпрати ново съобщение
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
        <label htmlFor="name" className="block text-sm font-semibold leading-6 text-foreground">
          Име
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
            className="block w-full rounded-md border-0 py-2 px-3.5 bg-background text-foreground shadow-sm ring-1 ring-inset ring-border placeholder:text-muted-foreground focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-semibold leading-6 text-foreground">
          Имейл
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
            className="block w-full rounded-md border-0 py-2 px-3.5 bg-background text-foreground shadow-sm ring-1 ring-inset ring-border placeholder:text-muted-foreground focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-semibold leading-6 text-foreground">
          Съобщение
        </label>
        <div className="mt-2.5">
          <textarea
            name="message"
            id="message"
            required
            value={formState.message}
            onChange={handleChange}
            rows={4}
            className="block w-full rounded-md border-0 py-2 px-3.5 bg-background text-foreground shadow-sm ring-1 ring-inset ring-border placeholder:text-muted-foreground focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div>
        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Изпращане...' : 'Изпрати съобщение'}
        </Button>
      </div>
    </form>
  );
} 