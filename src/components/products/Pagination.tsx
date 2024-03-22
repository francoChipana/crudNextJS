"use client";
import {
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Pagination as SPagination,
} from "@/lib/ui/pagination";
import { useSearchParams } from "next/navigation";

interface Props {
  totalPages: number;
}

const Pagination = ({ totalPages }: Props) => {
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;

  const paginationItems = [];

  for (let i = 1; i <= totalPages; i++) {
    paginationItems.push(
      <PaginationItem key={`paginationProduct${i}`}>
        <PaginationLink href={`/products?page=${i}`}>{i}</PaginationLink>
      </PaginationItem>
    );
  }

  return (
    <SPagination className="select-none">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={`products?page=${currentPage - 1}`}
            aria-disabled={currentPage <= 1}
            tabIndex={currentPage <= 1 ? -1 : undefined}
            className={
              currentPage <= 1 ? "pointer-events-none opacity-50" : undefined
            }
          />
        </PaginationItem>
        {paginationItems.map((page) => page)}
        <PaginationItem>
          <PaginationNext
            href={`products?page=${currentPage + 1}`}
            aria-disabled={currentPage >= totalPages}
            tabIndex={currentPage >= totalPages ? -1 : undefined}
            className={
              currentPage >= totalPages
                ? "pointer-events-none opacity-50"
                : undefined
            }
          />
        </PaginationItem>
      </PaginationContent>
    </SPagination>
  );
};

export default Pagination;
