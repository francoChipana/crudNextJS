"use client";
import { Category } from "@/entities/Category";
import { Button } from "@/lib/ui/button";
import { Checkbox } from "@/lib/ui/checkbox";
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
  categories: Category[];
}

export const CreatedForm = ({ closeModal, categories }: Props) => {
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

    for (const category of data.categories) {
      formData.append("category", category);
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

        <FormField
          control={form.control}
          name="categories"
          defaultValue={[]}
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Categorias</FormLabel>
              </div>
              {categories.map((category) => (
                <FormField
                  key={category.id}
                  control={form.control}
                  name="categories"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={category.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(category.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, category.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value: string) => value !== category.id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          {category.name}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />

        <Button type="submit">Registrar</Button>
      </form>
    </Form>
  );
};
