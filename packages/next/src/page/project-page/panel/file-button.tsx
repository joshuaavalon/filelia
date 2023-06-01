import { useCallback, useContext, useMemo } from "react";
import { ActionIcon } from "@mantine/core";
import { spotlight, SpotlightProvider } from "@mantine/spotlight";
import { IconFolder, IconSearch } from "@tabler/icons-react";
import filterPredicate from "#utils/filter-predicate";
import joinUrl from "#utils/url-join";
import Context from "../context";

import type { FC } from "react";
import type {
  SpotlightAction,
  SpotlightProviderProps
} from "@mantine/spotlight";

export interface Props {}

const Component: FC<Props> = () => {
  const { result } = useContext(Context);
  const filter: NonNullable<SpotlightProviderProps["filter"]> = useCallback(
    (query, actions) =>
      actions.filter(action => filterPredicate(query, false)(action.title)),
    []
  );
  const actions = useMemo(() => {
    const {
      data: { files },
      project
    } = result;
    return files.map(
      (file): SpotlightAction => ({
        title: file,
        onTrigger() {
          const url = joinUrl(`/project/${project.id}/file/`, file);
          window.open(url, "_blank");
        }
      })
    );
  }, [result]);
  const onClick = useCallback(() => {
    spotlight.open();
  }, []);
  return (
    <SpotlightProvider
      actions={actions}
      searchIcon={<IconSearch size="1.2rem" />}
      searchPlaceholder="Search"
      nothingFoundMessage="Nothing found"
      filter={filter}
      limit={10}
      highlightQuery
    >
      <ActionIcon title="File" size="lg" variant="default" onClick={onClick}>
        <IconFolder size="1rem" />
      </ActionIcon>
    </SpotlightProvider>
  );
};

Component.displayName = "FileButton";
export default Component;
