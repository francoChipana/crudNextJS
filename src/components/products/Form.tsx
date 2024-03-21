"use client";
import { Button } from "@/lib/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/lib/ui/form";
import { Input } from "@/lib/ui/input";
import { createProduct } from "@/service/ProductService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { formScheme } from "./shared/schemaValidation";

interface Props {
  closeModal: () => void;
}

export const CreatedForm = ({ closeModal }: Props) => {
  const form = useForm({
    resolver: zodResolver(formScheme),
  });
  const fileRef = form.register("image");
  const router = useRouter();

  const submit = (data: any) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("price", data.price);
    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }

    createProduct(formData);
    closeModal();
    router.refresh();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submit)}
        className="flex flex-col gap-5"
      >
        <FormField
          control={form.control}
          name="name"
          defaultValue=""
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Nombre" {...field} />
              </FormControl>
              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          defaultValue={1}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Precio</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Precio"
                    type="number"
                    {...field}
                    onChange={(event) =>
                      field.onChange(Number(event.target.value))
                    }
                  />
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Imagen</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Imagen"
                    type="file"
                    {...fileRef}
                    onChange={(event) => {
                      field.onChange(event.target?.files?.[0] ?? undefined);
                    }}
                  />
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            );
          }}
        />

        <Button type="submit">Registrar</Button>
      </form>
    </Form>
  );
};
