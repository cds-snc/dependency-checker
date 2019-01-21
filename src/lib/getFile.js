import fs from "fs";
import fetch from "node-fetch";
export const getFile = async file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};

export const getFileIfExists = async file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) resolve(false);
      resolve(data);
    });
  });
};

export const fetchPackageData = async path => {
  let response = await fetch(path);
  const result = await response.json();
  return result;
};
