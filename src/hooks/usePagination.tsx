
import { useState, useMemo, useCallback } from 'react';

export interface PaginationState {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  startIndex: number;
  endIndex: number;
}

export interface PaginationActions {
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  goToFirstPage: () => void;
  goToLastPage: () => void;
  setItemsPerPage: (itemsPerPage: number) => void;
}

export interface UsePaginationProps {
  totalItems: number;
  initialPage?: number;
  initialItemsPerPage?: number;
  onPageChange?: (page: number) => void;
}

export const usePagination = ({
  totalItems,
  initialPage = 1,
  initialItemsPerPage = 10,
  onPageChange
}: UsePaginationProps): [PaginationState, PaginationActions] => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

  const paginationState = useMemo((): PaginationState => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const hasNextPage = currentPage < totalPages;
    const hasPrevPage = currentPage > 1;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage - 1, totalItems - 1);

    return {
      currentPage,
      totalPages,
      totalItems,
      itemsPerPage,
      hasNextPage,
      hasPrevPage,
      startIndex,
      endIndex,
    };
  }, [currentPage, totalItems, itemsPerPage]);

  const goToPage = useCallback((page: number) => {
    const validPage = Math.max(1, Math.min(page, paginationState.totalPages));
    setCurrentPage(validPage);
    onPageChange?.(validPage);
  }, [paginationState.totalPages, onPageChange]);

  const nextPage = useCallback(() => {
    if (paginationState.hasNextPage) {
      goToPage(currentPage + 1);
    }
  }, [currentPage, paginationState.hasNextPage, goToPage]);

  const prevPage = useCallback(() => {
    if (paginationState.hasPrevPage) {
      goToPage(currentPage - 1);
    }
  }, [currentPage, paginationState.hasPrevPage, goToPage]);

  const goToFirstPage = useCallback(() => {
    goToPage(1);
  }, [goToPage]);

  const goToLastPage = useCallback(() => {
    goToPage(paginationState.totalPages);
  }, [paginationState.totalPages, goToPage]);

  const handleSetItemsPerPage = useCallback((newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
    onPageChange?.(1);
  }, [onPageChange]);

  const actions: PaginationActions = {
    goToPage,
    nextPage,
    prevPage,
    goToFirstPage,
    goToLastPage,
    setItemsPerPage: handleSetItemsPerPage,
  };

  return [paginationState, actions];
};
