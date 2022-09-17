import { Button, Text, useColorModeValue } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export const MyConnectButton = () => {
  const bg = useColorModeValue("brandGreen.600", "brandGreen.700");

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }: any) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button
                    bg={bg}
                    variant={"primary"}
                    onClick={openConnectModal}
                    type="button"
                  >
                    Connect Wallet
                  </Button>
                );
              }

              if (chain.unsupported) {
                return (
                  <Button
                    bg={bg}
                    variant={"primary"}
                    onClick={openChainModal}
                    type="button"
                  >
                    Wrong network
                  </Button>
                );
              }

              return (
                <div style={{ display: "flex", gap: 12 }}>
                  <Button
                    bg={bg}
                    flexDir={"column"}
                    display={"flex"}
                    fontSize={"sm"}
                    fontWeight={"light"}
                    variant={"primary"}
                    onClick={openAccountModal}
                    type="button"
                  >
                    <Text fontWeight={"bold"}>Connected Wallet</Text>
                    <Text>{account.displayName}</Text>
                  </Button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
