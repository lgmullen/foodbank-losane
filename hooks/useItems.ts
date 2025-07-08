import { addItem, fetchItems, deleteItem } from "@/api/items";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetItems() {
  return useQuery({
    queryKey: ["items"],
    queryFn: fetchItems,
  });
}

export function useAddItem(onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();
  console.log("here");
  return useMutation({
    mutationFn: addItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      if (onSuccessCallback) onSuccessCallback();
    },
  });
}

export function useDeleteItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });
}