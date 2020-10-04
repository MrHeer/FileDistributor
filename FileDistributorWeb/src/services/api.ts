import { stringify } from "qs";
import request from "@/utils/request";

export async function getTreeData() {
  return request("/api/getTreeData");
}

export async function getHostData() {
  return request("/api/getHostData");
}

export async function addHost(params: FormData) {
  return request("/api/addHost", {
    method: "POST",
    body: JSON.stringify(params),
  });
}

export async function deleteHost(params: FormData) {
  return request("/api/deleteHost", {
    method: "POST",
    body: JSON.stringify(params),
  });
}

export async function editHost(params: FormData) {
  return request("/api/editHost", {
    method: "POST",
    body: JSON.stringify(params),
  });
}

export async function testHost(params: FormData) {
  return request("/api/testHost", {
    method: "POST",
    body: JSON.stringify(params),
  });
}

export async function distribute(params: FormData) {
  return request("/api/distribute", {
    method: "POST",
    body: JSON.stringify(params),
  });
}

export async function getFileData(params: FormData) {
  return request(`/api/getFileData?${stringify(params)}`);
}

export async function deleteFile(params: FormData) {
  return request("/api/deleteFile", {
    method: "POST",
    body: JSON.stringify(params),
  });
}
