import { addItem, fetchItems } from "@/api/items";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useItems() {
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
