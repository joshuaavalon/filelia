CREATE VIRTUAL TABLE tag_fts USING fts5(id, name, content='tag', tokenize="trigram");
CREATE TRIGGER tag_fts_ai AFTER INSERT ON tag BEGIN
  INSERT INTO tag_fts(id, name) VALUES (new.id, new.name);
END;
CREATE TRIGGER tag_fts_ad AFTER DELETE ON tag BEGIN
  DELETE FROM tag_fts WHERE id = old.id;
END;
CREATE TRIGGER tag_fts_au AFTER UPDATE ON tag BEGIN
  DELETE FROM tag_fts WHERE id = old.id;
  INSERT INTO tag_fts(id, name) VALUES (new.id, new.name);
END;

CREATE VIRTUAL TABLE project_fts USING fts5(id, name, content='project', tokenize="trigram");
CREATE TRIGGER project_fts_ai AFTER INSERT ON project BEGIN
  INSERT INTO project_fts(id, name) VALUES (new.id, new.name);
END;
CREATE TRIGGER project_fts_ad AFTER DELETE ON project BEGIN
  DELETE FROM project_fts WHERE id = old.id;
END;
CREATE TRIGGER project_fts_au AFTER UPDATE ON project BEGIN
  DELETE FROM project_fts WHERE id = old.id;
  INSERT INTO project_fts(id, name) VALUES (new.id, new.name);
END;
