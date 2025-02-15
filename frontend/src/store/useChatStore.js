import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  // ✅ Fetch users list
  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load users");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  // ✅ Fetch messages for the selected user
  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  // ✅ Send messages instantly & update UI (Optimistic UI)
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();

    const tempMessage = {
      _id: Date.now().toString(), // Temporary ID
      senderId: useAuthStore.getState().authUser._id,
      receiverId: selectedUser._id,
      text: messageData.text,
      image: messageData.image,
      createdAt: new Date().toISOString(),
    };

    set({ messages: [...messages, tempMessage] });

    try {
      // ✅ Send message to the backend
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );

      // ✅ Replace temp message with actual message from the backend
      set({
        messages: get().messages.map((msg) =>
          msg._id === tempMessage._id ? res.data : msg
        ),
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message");
      // Remove failed message from UI
      set({
        messages: get().messages.filter((msg) => msg._id !== tempMessage._id),
      });
    }
  },

  // ✅ Subscribe to real-time messages
  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      // ✅ Prevent duplicate messages
      if (get().messages.some((msg) => msg._id === newMessage._id)) return;

      set({ messages: [...get().messages, newMessage] });
    });
  },

  // ✅ Unsubscribe from messages (Clean up properly)
  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },

  // ✅ Set selected user
  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
