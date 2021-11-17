# DBML

DBML (database markup language) is a simple, readable DSL language designed to define database structures. This page outlines the full syntax documentations of DBML.

Docs can be found [here](https://www.dbml.org/docs/).

Editor can be found [here](https://dbdiagram.io/).

## Example

```dbml
Table projects {
  id int [ pk, increment ]
  name varchar [ not null ]
}

Table highscores {
  id int [ pk, increment ]
  projectId int
  nickname varchar(255) [ not null ]
  score int [ not null, default: 0 ]
  source varchar(100)
  checksum char(32) [ not null ]
}

Ref {
  projects.id < highscores.projectId
} 
```
