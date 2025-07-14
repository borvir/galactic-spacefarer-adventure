using adventure from '../db/data-model';

service GalacticAdventureService @(impl: 'srv/service.js') {
    entity Departments as projection on adventure.Departments;
    entity Positions   as projection on adventure.Positions;
    entity Spacefarers as projection on adventure.Spacefarers;
}

annotate GalacticAdventureService with @(requires: 'admin');
