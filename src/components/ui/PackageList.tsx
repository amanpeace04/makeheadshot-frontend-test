import { motion } from "framer-motion";
import PackageCard, { Package } from "@/components/ui/PackageCard";

interface PackageListProps {
  packages: Package[];
  onSelect: (pkg: Package) => void;
}

export default function PackageList({ packages, onSelect }: PackageListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {packages.map((pkg) => (
        <motion.div
          key={pkg.package_name}
          className="w-full"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <PackageCard pkg={pkg} onBuy={onSelect} />
        </motion.div>
      ))}
    </div>
  );
}
