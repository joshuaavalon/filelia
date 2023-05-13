import { Burger, Header, MediaQuery, Text } from "@mantine/core";
import styled from "@emotion/styled";

import type { FC } from "react";

const Spacer = styled.div({ flex: 1 });
const StyledHeader = styled(Header)`
  display: flex;
  align-items: center;
`;

export interface Props {
  opened: boolean;
  onClick?: () => void;
}

const Component: FC<Props> = props => {
  const { opened, onClick } = props;
  return (
    <StyledHeader height={50} p="md">
      <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger opened={opened} onClick={onClick} size="sm" mr="xl" />
        </MediaQuery>
        <Text>Application header</Text>
      </div>
      <Spacer />
      <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
        <div />
      </MediaQuery>
    </StyledHeader>
  );
};

Component.displayName = "Header";
export default Component;
