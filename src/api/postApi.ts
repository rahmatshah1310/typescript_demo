import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PostService } from "@services";

// Create Post Mutation
export const usePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      return await PostService.createPost(formData);
    },
    onSuccess: () => {
      alert("Post created successfully!");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error: any) => {
      alert(`Post creation failed: ${error?.message || "Unknown error"}`);
    },
  });
};

// Update Post Mutation
export const useUpdatePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, formData }: { id: string; formData: FormData }) => {
      return await PostService.updatePost(id, formData);
    },
    onSuccess: (_, variables) => {
      const { id } = variables;
      alert("Post updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", id] });
    },
    onError: (error: any) => {
      alert(`Post update failed: ${error?.message || "Unknown error"}`);
    },
  });
};

// Get All Posts Query
export const useGetAllPosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await PostService.getAllPosts();
      return response.data;
    },
    onError: (error: any) => {
      alert(`Failed to fetch posts: ${error?.message || "Unknown error"}`);
    },
  });
};

// Get Single Post Query
export const useGetSinglePost = (id: string) => {
  return useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      const response = await PostService.getSinglePost(id);
      return response.data;
    },
    enabled: !!id, // run query only if id exists
    onError: (error: any) => {
      alert(`Failed to fetch post: ${error?.message || "Unknown error"}`);
    },
  });
};
