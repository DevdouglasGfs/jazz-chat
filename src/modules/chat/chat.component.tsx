import * as Clipboard from "expo-clipboard";
import { Account, Group } from "jazz-tools";
import { useState } from "react";
import React, {
  Button,
  FlatList,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";

import { useAccount, useCoState } from "jazz-expo";
import { Chat, Message } from "@/data/schema";
import { styles } from "./chat.styles";

export function ChatScreen() {
  const { me, logOut } = useAccount(Account, { resolve: { profile: true } });
  const [chatId, setChatId] = useState<string>();
  const [chatIdInput, setChatIdInput] = useState<string>();
  const loadedChat = useCoState(Chat, chatId, { resolve: { $each: true } });
  const [message, setMessage] = useState("");

  const handleLogOut = () => {
    setChatId(undefined);
    logOut();
  };

  const createChat = () => {
    const group = Group.create();
    group.addMember("everyone", "writer");
    const chat = Chat.create([], group);
    setChatId(chat.id);
  };

  const joinChat = () => {
    if (!chatIdInput) return Alert.alert("Error", "Chat ID cannot be empty.");

    if (chatIdInput.startsWith("https://chat.jazz.tools/#/chat/")) {
      setChatId(chatIdInput.split("/").pop());
    } else {
      setChatId(chatIdInput);
    }
  };

  const sendMessage = () => {
    if (!loadedChat || !message.trim()) return;

    loadedChat.push(
      Message.create({ text: message }, { owner: loadedChat?._owner })
    );
    setMessage("");
  };

  const renderMessageItem = ({ item }: { item: Message }) => {
    const isMe = item._edits?.text?.by?.isMe;
    return (
      <View
        style={[
          styles.messageContainer,
          isMe ? styles.myMessage : styles.otherMessage,
        ]}
      >
        {!isMe ? (
          <Text
            style={[
              styles.messageSender,
              { textAlign: isMe ? "right" : "left" },
            ]}
          >
            {item?._edits?.text?.by?.profile?.name}
          </Text>
        ) : null}
        <View style={styles.messageContent}>
          <Text style={styles.messageText}>{item.text}</Text>
          <Text style={[styles.messageTime, { marginTop: !isMe ? 8 : 4 }]}>
            {item?._edits?.text?.madeAt?.getHours().toString().padStart(2, "0")}
            :
            {item?._edits?.text?.madeAt
              ?.getMinutes()
              .toString()
              .padStart(2, "0")}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {!loadedChat ? (
        <View style={styles.welcomeContainer}>
          <Text style={styles.usernameTitle}>Username</Text>
          <TextInput
            style={styles.usernameInput}
            value={me?.profile.name ?? ""}
            onChangeText={(value) => {
              if (!me?.profile) return;
              me.profile.name = value;
            }}
            textAlignVertical="center"
            onSubmitEditing={sendMessage}
            testID="username-input"
          />
          <TouchableOpacity onPress={createChat} style={styles.newChatButton}>
            <Text style={styles.newChatButtonText}>Start new chat</Text>
          </TouchableOpacity>
          <Text style={styles.joinChatTitle}>Join existing chat</Text>
          <TextInput
            style={styles.chatIdInput}
            placeholder="Chat ID"
            value={chatIdInput ?? ""}
            onChangeText={setChatIdInput}
            textAlignVertical="center"
            onSubmitEditing={() => {
              if (chatIdInput) {
                setChatId(chatIdInput);
              }
            }}
            testID="chat-id-input"
          />
          <TouchableOpacity
            testID="join-chat-button"
            onPress={joinChat}
            style={styles.joinChatButton}
          >
            <Text style={styles.newChatButtonText}>Join chat</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View style={styles.chatHeader}>
            <Button
              onPress={() => {
                if (!loadedChat?.id) return;

                Clipboard.setStringAsync(
                  `https://chat.jazz.tools/#/chat/${loadedChat.id}`
                );
                Alert.alert("Copied to clipboard", `Chat ID: ${loadedChat.id}`);
              }}
              title="Share"
            />
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>Jazz chat</Text>
            <Button onPress={handleLogOut} title="Logout" />
          </View>
          <FlatList
            contentContainerStyle={{
              flexGrow: 1,
              gap: 6,
              padding: 8,
              justifyContent: "flex-end",
            }}
            style={styles.messageList}
            data={loadedChat}
            keyExtractor={(item) => item.id}
            renderItem={renderMessageItem}
          />

          <KeyboardAvoidingView
            keyboardVerticalOffset={110}
            behavior="padding"
            style={styles.inputContainer}
          >
            <SafeAreaView style={styles.inputRow}>
              <TextInput
                style={styles.messageInput}
                value={message}
                onChangeText={setMessage}
                placeholder="Type a message..."
                textAlignVertical="center"
                onSubmitEditing={sendMessage}
                testID="message-input"
              />
              <TouchableOpacity
                onPress={sendMessage}
                style={styles.sendButton}
                testID="send-button"
              >
                <Text>↑</Text>
              </TouchableOpacity>
            </SafeAreaView>
          </KeyboardAvoidingView>
        </>
      )}
    </View>
  );
}
