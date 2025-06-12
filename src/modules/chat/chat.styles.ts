import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    height: "100%",
  },
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
    paddingTop: 48,
    backgroundColor: "#f0f0f0",
  },
  welcomeContainer: {
    flex: 1,
    flexDirection: "column",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  usernameTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 24,
  },
  usernameInput: {
    borderRadius: 4,
    height: 48,
    padding: 8,
    marginBottom: 48,
    width: 160,
    borderWidth: 1,
    borderColor: "#e5e5e5",
  },
  newChatButton: {
    backgroundColor: "#3b82f6",
    padding: 16,
    borderRadius: 6,
  },
  newChatButtonText: {
    color: "white",
    fontWeight: "600",
  },
  joinChatTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 24,
  },
  chatIdInput: {
    borderRadius: 4,
    height: 48,
    padding: 8,
    margin: 8,
    marginTop: 16,
    width: 320,
    borderWidth: 1,
    borderColor: "#e5e5e5",
  },
  joinChatButton: {
    backgroundColor: "#22c55e",
    padding: 16,
    borderRadius: 6,
  },
  messageList: {
    display: "flex",
  },
  messageContainer: {
    borderRadius: 8,
    padding: 4,
    paddingHorizontal: 6,
    maxWidth: "80%",
  },
  myMessage: {
    backgroundColor: "#e5e5e5",
    alignSelf: "flex-end",
  },
  otherMessage: {
    backgroundColor: "#d4d4d4",
    alignSelf: "flex-start",
  },
  messageSender: {
    fontSize: 12,
    color: "#6b7280",
  },
  messageContent: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  messageText: {
    color: "black",
    fontSize: 16,
    maxWidth: "85%",
  },
  messageTime: {
    fontSize: 10,
    color: "#6b7280",
    marginLeft: 8,
  },
  inputContainer: {
    padding: 12,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#d4d4d4",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  messageInput: {
    borderRadius: 9999,
    height: 32,
    paddingVertical: 0,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: "#e5e5e5",
    flex: 1,
  },
  sendButton: {
    backgroundColor: "#d4d4d4",
    borderRadius: 9999,
    height: 32,
    width: 32,
    alignItems: "center",
    justifyContent: "center",
  },
});
