namespace adventure;

entity Departments {
    key ID   : UUID;
        name : String;
}

entity Positions {
    key ID    : UUID;
        title : String;
}

@odata.draft.enabled
entity Spacefarers {
    key ID                      : UUID;
        name                    : String;
        stardustCollection      : Integer;
        wormholeNavigationSkill : Integer;
        originPlanet            : String;
        spacesuitColor          : String;
        department              : Association to Departments;
        position                : Association to Positions;
}
