import express from "express";
import { CreateContactGroupController } from "../useCases/createContactGroup/createContactGroup.controller";
import { GetContactGroupsController } from "../useCases/getContactGroups/getContactGroups.controller";
import { InviteToGroupController } from "../useCases/inviteToGroup/inviteToGroup.controller";
import { DeleteGroupController } from "../useCases/deleteGroup/deleteGroup.controller";
import { UpdateGroupController } from "../useCases/updateGroup/updateGroup.controller";
import { UpdateGroupInviteController } from "../useCases/updateGroupInvite/UpdateGroupInvite.controller";
import { GetInvitesController } from "../useCases/getInvites/getInvites.controller";

const contacts = express();

const createContactGroupController = new CreateContactGroupController();
const getContactGroupsController = new GetContactGroupsController();
const updateGroupController = new UpdateGroupController();
const deleteGroupController = new DeleteGroupController();
const getInvitesController = new GetInvitesController();
const inviteToGroupController = new InviteToGroupController();
const updateGroupInviteController = new UpdateGroupInviteController();

contacts.get(
  "/all",
  ...getContactGroupsController.validator,
  getContactGroupsController.handler
);
contacts.post(
  "/create-group",
  ...createContactGroupController.validator,
  createContactGroupController.handler
);
contacts.put(
  "/update-group/:id",
  ...updateGroupController.validator,
  updateGroupController.handler
);
contacts.delete(
  "/delete-group/:id",
  ...deleteGroupController.validator,
  deleteGroupController.handler
);
contacts.get(
  "/invites",
  ...getInvitesController.validator,
  getInvitesController.handler
);
contacts.post(
  "/invite/:groupId",
  ...inviteToGroupController.validator,
  inviteToGroupController.handler
);
contacts.put(
  "/update-invite/:id",
  ...updateGroupInviteController.validator,
  updateGroupInviteController.handler
);

export default contacts;
