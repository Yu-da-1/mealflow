import { FoodRegisterForm } from "@/features/inventory/components/FoodRegisterForm";

export default function NewInventoryPage() {
  return (
    <div className="p-6 max-w-lg">
      <h1 className="text-xl font-bold text-foreground mb-6">食品を登録</h1>
      <FoodRegisterForm />
    </div>
  );
}
