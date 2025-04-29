import { BadgeCheck } from "lucide-react";

export const VerificationBadge = ({ isVerified }: { isVerified: boolean }) => {
  if (!isVerified) return null;

  return (
    <div className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 text-sm rounded-full font-medium">
      <BadgeCheck className="w-4 h-4" />
      Verified
    </div>
  );
};
