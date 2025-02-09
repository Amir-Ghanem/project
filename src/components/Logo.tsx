import { Building2 } from 'lucide-react';

export function Logo({ className = "w-auto h-8" }) {
  return (
    <div className="flex items-center gap-2">
      <Building2 className="w-8 h-8 text-teal-500" />
      <div className="font-bold text-xl">
        <span className="text-teal-500">ACC</span>
        <span className="text-teal-500">.</span>
      </div>
    </div>
  );
}