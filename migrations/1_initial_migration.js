const Migrations = artifacts.require("WETH9");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
