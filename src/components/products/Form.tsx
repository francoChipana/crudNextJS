"use client";
import { Button } from "@/lib/ui/button";
import { Input } from "@/lib/ui/input";
import { createProduct } from "@/service/ProductService";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface Props {
  closeModal: () => void;
}

export const Form = ({ closeModal }: Props) => {
  const { handleSubmit, register } = useForm();
  const router = useRouter();

  const submit = (data: any) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("price", data.price);
    if (data.image.length > 0) {
      formData.append("image", data.image[0]);
    }

    createProduct(formData);
    closeModal();
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-5">
      <Input placeholder="Nombre" {...register("name")} />
      <Input placeholder="Precio" type="number" {...register("price")} />
      <Input placeholder="Imagen" type="file" {...register("image")} />
      <Button>Registrar</Button>
    </form>
  );
};
