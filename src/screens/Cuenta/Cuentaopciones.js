import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { ListItem, Icon, Text } from "react-native-elements";
import { map } from "lodash";
import { Modal } from "../../components/Shared/LoadingModal/Modal";
import { ChangeDisplayFormName } from "./ChangeDisplayForm/ChangeDisplayFormName";
import { ChangeEmailForm } from "./ChangeDisplayForm/ChangeEmailForm";
import { ChangePasswordForm } from "./ChangeDisplayForm/ChangePasswordForm";

export function Cuentaopciones(props) {
  const { onReload } = props;
  const [modal, setModal] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);

  const closeModal = () => setModal((prevState) => !prevState);

  const selectedComponent = (key) => {
    if (key === "displayName") {
      setRenderComponent(<ChangeDisplayFormName onClose={closeModal} onReload={onReload} />);
    }

    if (key === "email") {
      setRenderComponent(<ChangeEmailForm onClose={closeModal} onReload={onReload}/>);
    }

    if (key === "password") {
      setRenderComponent(<ChangePasswordForm onClose={closeModal} />);
    }

    closeModal();
  };

  const menuOptions = getMenu(selectedComponent);

  return (
    <View>
      {map(menuOptions, (menu, index) => (
        <ListItem key={index} bottomDivider onPress={menu.onPress}>
          <Icon
            type={menu.iconType}
            name={menu.iconNameLeft}
            color={menu.iconColorLeft}
          />
          <ListItem.Content>
            <ListItem.Title>{menu.title}</ListItem.Title>
          </ListItem.Content>
          <Icon
            type={menu.iconType}
            name={menu.iconNameRight}
            color={menu.iconColorRight}
          />
        </ListItem>
      ))}
      <View>
        <Modal show={modal} close={closeModal}>
          {renderComponent}
        </Modal>
      </View>
    </View>
  );
}

function getMenu(selectedComponent) {
  return [
    {
      title: "Cambiar nombre y apellido",
      iconType: "material-community",
      iconNameLeft: "account-circle",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      onPress: () => selectedComponent("displayName"),
    },
    {
      title: "Cambiar email",
      iconType: "material-community",
      iconNameLeft: "at",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      onPress: () => selectedComponent("email"),
    },
    {
      title: "Cambiar contraseña",
      iconType: "material-community",
      iconNameLeft: "lock-reset",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      onPress: () => selectedComponent("password"),
    },
  ];
}

const styles = StyleSheet.create({
  modal: {
    width: "100%",
  },
});
