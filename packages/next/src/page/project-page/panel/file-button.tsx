import { useCallback, useContext, useMemo } from "react";
import { ActionIcon } from "@mantine/core";
import { spotlight, SpotlightProvider } from "@mantine/spotlight";
import { TbFolder, TbSearch } from "react-icons/tb";
import filterPredicate from "#utils/filter-predicate";
import joinUrl from "#utils/url-join";
import { ProjectContext } from "../context";

import type { FC } from "react";
import type {
  SpotlightAction,
  SpotlightProviderProps
} from "@mantine/spotlight";

export interface Props {}

const Component: FC<Props> = () => {
  const { result } = useContext(ProjectContext);
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
      searchIcon={<TbSearch size="1.2rem" />}
      searchPlaceholder="Search"
      nothingFoundMessage="Nothing found"
      filter={filter}
      limit={10}
    >
      <ActionIcon title="File" size="lg" variant="default" onClick={onClick}>
        <TbFolder size="1.625rem" />
      </ActionIcon>
    </SpotlightProvider>
  );
};

Component.displayName = "FileButton";
export default Component;
