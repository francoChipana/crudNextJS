"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Product } from "@/entities/Product";
import { editProduct } from "@/service/ProductService";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface Props {
  product: Product;
}

export const FormEdit = ({ product }: Props) => {
  const { handleSubmit, register } = useForm({
    defaultValues: {
      name: product.name,
      price: product.price,
      image: null,
    },
  });
  const router = useRouter();

  const submit = async (data: any) => {
    await editProduct(product.id, data);
    router.refresh();
    router.push("/");
  };

  const onCancel = () => {
    router.push("/");
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="container mt-16 max-w-2xl flex flex-col gap-5"
    >
      <Input placeholder="Nombre" {...register("name")} />
      <Input placeholder="Precio" type="number" {...register("price")} />
      <Input placeholder="Imagen" type="file" {...register("image")} />
      <div className="flex gap-2 justify-end">
        <Button className="bg-emerald-600 hover:bg-emerald-500">Editar</Button>
        <Button variant="destructive" type="button" onClick={() => onCancel()}>
          Cancelar
        </Button>
      </div>
    </form>
  );
};
