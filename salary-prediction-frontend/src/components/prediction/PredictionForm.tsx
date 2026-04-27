'use client';

import { useState } from 'react';
import { useForm } from 'react-form'; // Wait, let's use standard react states or zod later
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm as useReactHookForm } from 'react-hook-form';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { predictSalary } from '@/lib/api';
import { PredictionResponse } from '@/types';
import ResultCard from './ResultCard';

const predictionSchema = z.object({
  age: z.number().min(18, 'Age must be at least 18').max(100, 'Age must be less than 100'),
  gender: z.enum(['Male', 'Female'], { errorMap: () => ({ message: 'Please select gender' }) }),
  education: z.string().min(1, 'Please select your education level'),
  experience: z.number().min(0, 'Experience cannot be negative').max(80, 'Experience seems too high'),
  job_role: z.string().min(2, 'Job role is required'),
  location: z.string().optional(),
});

type PredictionFormValues = z.infer<typeof predictionSchema>;

export default function PredictionForm() {
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useReactHookForm<PredictionFormValues>({
    resolver: zodResolver(predictionSchema),
    defaultValues: {
      age: undefined,
      experience: undefined,
    }
  });

  const onSubmit = async (data: PredictionFormValues) => {
    try {
      setApiError(null);
      setResult(null);
      const response = await predictSalary(data);
      setResult(response);
    } catch (error) {
      setApiError('Failed to predict salary. Please try again.');
    }
  };

  const educationOptions = [
    { value: "Bachelor's", label: "Bachelor's Degree" },
    { value: "Master's", label: "Master's Degree" },
    { value: 'PhD', label: 'PhD or Doctorate' },
  ];

  const genderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Form Section */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-6 md:p-8 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 relative"
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Your Details</h2>
            <p className="text-slate-500 text-sm mt-1">Enter your professional information to get a prediction.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Age"
                type="number"
                placeholder="25"
                {...register('age', { valueAsNumber: true })}
                error={errors.age?.message}
              />
              <Select
                label="Gender"
                options={genderOptions}
                {...register('gender')}
                error={errors.gender?.message}
              />
            </div>

            <div className="grid grid-cols-1 gap-4">
              <Input
                label="Years of Experience"
                type="number"
                placeholder="3"
                {...register('experience', { valueAsNumber: true })}
                error={errors.experience?.message}
              />
            </div>

            <div className="relative">
              <Select
                label="Education Level"
                options={educationOptions}
                {...register('education')}
                error={errors.education?.message}
              />
            </div>

            <Input
              label="Job Role"
              placeholder="e.g. Software Engineer"
              {...register('job_role')}
              error={errors.job_role?.message}
            />

            <Input
              label="Location (Optional)"
              placeholder="e.g. New York, Remote"
              {...register('location')}
              error={errors.location?.message}
            />

            {apiError && (
              <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm font-medium border border-red-100">
                {apiError}
              </div>
            )}

            <Button type="submit" className="w-full mt-4" isLoading={isSubmitting}>
              {isSubmitting ? 'Analyzing Data...' : 'Predict Salary'}
            </Button>
          </form>
        </motion.div>

        {/* Result Section */}
        <div className="flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {result ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                <ResultCard salary={result.predicted_salary} />
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full min-h-[300px] border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-center p-8 bg-slate-50/50"
              >
                <div className="w-16 h-16 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-700">Awaiting Information</h3>
                <p className="text-slate-500 text-sm mt-2 max-w-[250px]">
                  Fill out the form and submit to see your AI-predicted salary range here.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
