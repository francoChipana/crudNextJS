"use client";
import { Category } from "@/entities/Category";
import { Product } from "@/entities/Product";
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
import { deleteProductCategories, editProduct } from "@/service/ProductService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { formScheme } from "../shared/schemaValidation";

interface Props {
  product: Product;
  categories: Category[];
}

export const FormEdit = ({ product, categories }: Props) => {
  const form = useForm({
    resolver: zodResolver(formScheme),
  });
  const fileRef = form.register("image");
  const router = useRouter();

  const submit = async (data: any) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("price", data.price);
    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }

    //* Eliminamos todas las categorias del producto
    await deleteProductCategories(product.id, product.categoriesId);

    formData.append("category+", JSON.stringify(data.categories));

    await editProduct(product.id, formData);
    router.push("/");
    router.refresh();
  };

  const onCancel = () => {
    router.push("/");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submit)}
        className="container mt-16 max-w-2xl flex flex-col gap-5"
      >
        {/* CAMPO DE NOMBRE */}
        <FormField
          control={form.control}
          name="name"
          defaultValue={product.name}
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

        {/* CAMPO DE PRECIO */}
        <FormField
          control={form.control}
          name="price"
          defaultValue={product.price}
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

        {/* CAMPO DE IMAGEN */}
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

        {/* CAMPO DE CATEGORIAS */}
        <FormField
          control={form.control}
          name="categories"
          defaultValue={product.categoriesId}
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
                            onCheckedChange={(checked) =>
                              checked
                                ? field.onChange([...field.value, category.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value: string) => value !== category.id
                                    )
                                  )
                            }
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

        <div className="flex gap-2 justify-end">
          <Button className="bg-emerald-600 hover:bg-emerald-500">
            Editar
          </Button>
          <Button
            variant="destructive"
            type="button"
            onClick={() => onCancel()}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </Form>
  );
};
