'use client';

import { useState, type ReactNode } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, Clipboard, LoaderCircle, Mail, TriangleAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';
import { Textarea } from '@/components/ui/textarea';
import { buildInquiryBody, contactDefaults, contactSchema, type ContactFormValues } from '@/lib/contact-schema';
import { identity } from '@/lib/portfolio-data';

type FormFieldProps = {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  children: ReactNode;
};

function FormField({ id, label, error, optional, children }: FormFieldProps) {
  return (
    <Field data-invalid={Boolean(error)}>
      <FieldLabel htmlFor={id}>{label}{optional && <span className="optional">Optional</span>}</FieldLabel>
      {children}
      {error && <FieldError id={`${id}-error`}>{error}</FieldError>}
    </Field>
  );
}

export function ContactForm() {
  const [submissionState, setSubmissionState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [preparedBody, setPreparedBody] = useState('');
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: contactDefaults,
    mode: 'onBlur',
  });

  const onSubmit = handleSubmit(async (values) => {
    setSubmissionState('loading');
    setStatusMessage('Preparing a secure email draft…');
    const body = buildInquiryBody(values);
    setPreparedBody(body);

    await new Promise((resolve) => window.setTimeout(resolve, 450));
    try {
      const subject = `${values.inquiryType} — ${values.fullName}`;
      const mailto = `mailto:${identity.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setSubmissionState('success');
      setStatusMessage('Your email application is opening. Review and send the message there; nothing has been sent automatically.');
      const mailLink = document.createElement('a');
      mailLink.href = mailto;
      mailLink.rel = 'noreferrer';
      mailLink.click();
    } catch {
      setSubmissionState('error');
      setStatusMessage(`The email application could not be opened. Copy the message below or email ${identity.email} directly.`);
    }
  });

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(preparedBody);
      setSubmissionState('success');
      setStatusMessage('Message copied. You can paste it into your preferred email or messaging application.');
    } catch {
      setSubmissionState('error');
      setStatusMessage('Copying was blocked by the browser. Select the prepared message and copy it manually.');
    }
  };

  const describe = (id: string, hasError: boolean) => hasError ? `${id}-error` : undefined;

  return (
    <form className="contact-form" noValidate onSubmit={onSubmit}>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" tabIndex={-1} autoComplete="off" {...register('website')} />
      </div>

      <div className="form-grid">
        <FormField id="fullName" label="Full name" error={errors.fullName?.message}>
          <Input id="fullName" autoComplete="name" placeholder="Your name" aria-invalid={Boolean(errors.fullName)} aria-describedby={describe('fullName', Boolean(errors.fullName))} {...register('fullName')} />
        </FormField>
        <FormField id="email" label="Email address" error={errors.email?.message}>
          <Input id="email" type="email" autoComplete="email" placeholder="you@company.com" aria-invalid={Boolean(errors.email)} aria-describedby={describe('email', Boolean(errors.email))} {...register('email')} />
        </FormField>
        <FormField id="company" label="Company or organization" optional error={errors.company?.message}>
          <Input id="company" autoComplete="organization" placeholder="Company name" aria-invalid={Boolean(errors.company)} aria-describedby={describe('company', Boolean(errors.company))} {...register('company')} />
        </FormField>
        <FormField id="inquiryType" label="Message type" error={errors.inquiryType?.message}>
          <NativeSelect className="select-full" id="inquiryType" aria-invalid={Boolean(errors.inquiryType)} aria-describedby={describe('inquiryType', Boolean(errors.inquiryType))} {...register('inquiryType')}>
            <NativeSelectOption value="Employment Opportunity">Employment opportunity</NativeSelectOption>
            <NativeSelectOption value="Professional Collaboration">Professional collaboration</NativeSelectOption>
            <NativeSelectOption value="General Message">General message</NativeSelectOption>
          </NativeSelect>
        </FormField>
      </div>

      <FormField id="message" label="Message" error={errors.message?.message}>
        <Textarea id="message" rows={7} placeholder="Share the role, team, opportunity, or reason you would like to connect." aria-invalid={Boolean(errors.message)} aria-describedby={describe('message', Boolean(errors.message))} {...register('message')} />
      </FormField>

      <FormField id="contactMethod" label="Preferred contact method" error={errors.contactMethod?.message}>
        <NativeSelect className="select-full" id="contactMethod" aria-invalid={Boolean(errors.contactMethod)} aria-describedby={describe('contactMethod', Boolean(errors.contactMethod))} {...register('contactMethod')}>
          <NativeSelectOption value="Email">Email</NativeSelectOption>
          <NativeSelectOption value="LinkedIn message">LinkedIn message</NativeSelectOption>
          <NativeSelectOption value="Schedule a call by email">Schedule a call by email</NativeSelectOption>
        </NativeSelect>
      </FormField>

      <Controller
        control={control}
        name="consent"
        render={({ field }) => (
          <Field data-invalid={Boolean(errors.consent)}>
            <FieldLabel className="consent-label" htmlFor="consent">
              <Checkbox id="consent" checked={field.value} onCheckedChange={field.onChange} aria-invalid={Boolean(errors.consent)} aria-describedby={errors.consent ? 'consent-error' : 'contact-privacy'} />
              <span>I consent to Emmanuel using these details to respond to this message.</span>
            </FieldLabel>
            {errors.consent && <FieldError id="consent-error">{errors.consent.message}</FieldError>}
          </Field>
        )}
      />

      <p className="form-privacy" id="contact-privacy">Your details stay in this browser until you choose to open your email application. This site does not silently store or submit the form.</p>

      <div className="form-actions">
        <Button type="submit" size="lg" disabled={submissionState === 'loading'}>
          {submissionState === 'loading' ? <LoaderCircle className="spin" aria-hidden="true" /> : <Mail aria-hidden="true" />}
          {submissionState === 'loading' ? 'Preparing…' : 'Prepare email message'}
        </Button>
        <a href={`mailto:${identity.email}`} className="direct-email">Or email {identity.email}</a>
      </div>

      {statusMessage && (
        <div className="form-status" data-state={submissionState} role={submissionState === 'error' ? 'alert' : 'status'} aria-live="polite">
          {submissionState === 'error' ? <TriangleAlert aria-hidden="true" /> : submissionState === 'success' ? <CheckCircle2 aria-hidden="true" /> : <LoaderCircle className="spin" aria-hidden="true" />}
          <p>{statusMessage}</p>
          {preparedBody && submissionState !== 'loading' && (
            <Button type="button" variant="outline" onClick={copyMessage}><Clipboard aria-hidden="true" /> Copy message</Button>
          )}
        </div>
      )}

      {preparedBody && submissionState === 'error' && <pre className="prepared-inquiry">{preparedBody}</pre>}
    </form>
  );
}
