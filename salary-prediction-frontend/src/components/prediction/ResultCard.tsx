import { motion } from 'framer-motion';
import { TrendingUp, CheckCircle } from 'lucide-react';

interface ResultCardProps {
  salary: number;
}

export default function ResultCard({ salary }: ResultCardProps) {
  // Format salary as currency
  const formattedSalary = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(salary);

  // Generate a plausible range
  const lowerBound = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(salary * 0.9);
  const upperBound = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(salary * 1.15);

  return (
    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-2xl shadow-blue-900/20 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -mr-8 -mt-8 w-48 h-48 rounded-full bg-white/10 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-40 h-40 rounded-full bg-indigo-400/20 blur-2xl"></div>
      
      <div className="relative z-10">
        <div className="flex items-center space-x-2 text-blue-100 mb-6">
          <CheckCircle className="w-5 h-5 text-emerald-400" />
          <span className="font-medium text-sm tracking-wide uppercase">Analysis Complete</span>
        </div>

        <h3 className="text-blue-100 text-lg mb-1">Estimated Base Salary</h3>
        <div className="flex items-baseline space-x-2 mb-6">
          <span className="text-5xl font-extrabold tracking-tight">{formattedSalary}</span>
          <span className="text-blue-200 text-lg">/ yr</span>
        </div>

        <div className="bg-white/10 rounded-2xl p-5 backdrop-blur-sm border border-white/10">
          <div className="flex items-start gap-4">
            <div className="bg-white/20 p-2 rounded-lg">
              <TrendingUp className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <p className="text-sm text-blue-100 mb-1">Market Range</p>
              <p className="font-semibold text-lg">{lowerBound} - {upperBound}</p>
              <p className="text-xs text-blue-200 mt-2 leading-relaxed">
                This estimate is based on the provided profile compared against recent market data. Factors like negotiation skills and specific company size may alter actual offers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
