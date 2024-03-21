"use client";
import { Product } from "@/entities/Product";
import { Button } from "@/lib/ui/button";
import { Input } from "@/lib/ui/input";
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
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("price", data.price);
    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }

    await editProduct(product.id, formData);
    router.push("/");
    router.refresh();
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
