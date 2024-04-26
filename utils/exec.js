import { exec } from 'child_process';
function execPromise(str){
  return new Promise((resolve, reject) => {
    exec(str, (error, stdout, stderr) => {
      if (error) {
       throw new Error(error);
      }
      if (stderr) {
        throw new Error(error);
      }
      resolve(stdout)
    });
  });
}
export default execPromise