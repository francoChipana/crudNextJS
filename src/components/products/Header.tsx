"use client";
import { Category } from "@/entities/Category";
import { Button } from "@/lib/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/lib/ui/dialog";
import { useState } from "react";
import { CreatedForm } from "./Form";

interface Props {
  categories: Category[];
}

export const Header = ({ categories }: Props) => {
  const [openModal, setOpenModal] = useState(false);
  const onOpenChange = () => {
    setOpenModal((prev) => !prev);
  };
  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <header className="flex justify-between mb-10">
      <h1 className="text-2xl">Productos</h1>
      <div>
        <Dialog open={openModal} onOpenChange={onOpenChange}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-500">
              + Crear
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Crear Producto</DialogTitle>
            </DialogHeader>
            <CreatedForm closeModal={closeModal} categories={categories} />
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
};
