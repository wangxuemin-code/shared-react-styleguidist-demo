const { BN, toWei, fromWei } = require('web3-utils');

export class FMath {
  private static DECIMALS: any = new BN(18);
  private static FIXED_1 = new BN(10).pow(FMath.DECIMALS);

  /**
   * @dev performs fixed addition of x and y
   * @param {string} x string of first multiplicand
   * @param {string} y string of second multiplicand
   * @notice same as normal addition
   */
  public static add(x: string | number, y: string | number) {
    const x1 = new BN(this.toFixed(x.toString()));
    const y1 = new BN(this.toFixed(y.toString()));
    return this.fromFixed(x1.add(y1));
  }

  /**
   * @dev performs fixed subtraction of x and y
   * @param {string} x string of first multiplicand
   * @param {string} y string of second multiplicand
   * @notice same as normal addition
   */
  public static sub(x: string | number, y: string | number) {
    const x1 = new BN(this.toFixed(x.toString()));
    const y1 = new BN(this.toFixed(y.toString()));
    return this.fromFixed(x1.sub(y1));
  }

  /**
   * @dev performs fixed multiply of x and y
   * @param {string} x string of first multiplicand
   * @param {string} y string of second multiplicand
   * @notice same as normal addition
   */
  public static mul(x: string | number, y: string | number) {
    const x1 = new BN(this.toFixed(x.toString()));
    const y1 = new BN(this.toFixed(y.toString()));
    return this.fromFixed(
      x1
        .mul(y1)
        .div(this.FIXED_1)
        .toString()
    );
  }

  /**
   * @dev performs fixed division of x and y
   * @param {string} x string of dividend
   * @param {string} y string of divisor
   * @notice will automatically truncate to 18dp
   */
  public static div(x: string | number, y: string | number) {
    const x1 = new BN(this.toFixed(x.toString()));
    const y1 = new BN(this.toFixed(y.toString()));

    const r_y = this.FIXED_1.mul(this.FIXED_1).div(y1);

    return this.fromFixed(
      x1
        .mul(r_y)
        .div(this.FIXED_1)
        .toString()
    );
  }

  /**
   * @dev rounds a number up to specified decimal places
   * @param {string} x string of number
   * @param {string} dp string of decimal place
   */
  public static roundUp(x: string | number, dp: number) {
    const x1 = new BN(this.toFixed(x.toString()));
    const dp1 = new BN(dp);
    const precision = new BN(10).pow(this.DECIMALS.sub(dp1));
    return this.fromFixed(
      x1
        .add(precision)
        .sub(new BN(1))
        .div(precision)
        .mul(precision)
        .toString()
    );
  }

  /**
   * @dev rounds a number down to specified decimal places
   * @param {string} x string of number
   * @param {string} dp string of decimal place
   */
  public static roundDown(x: string | number, dp: number) {
    const x1 = new BN(this.toFixed(x.toString()));
    const dp1 = new BN(dp);
    const precision = new BN(10).pow(this.DECIMALS.sub(dp1));
    return this.fromFixed(
      x1
        .div(precision)
        .mul(precision)
        .toString()
    );
  }

  /**
   * @dev converts a number to fixed point of 18 by multiplying by 10e18
   * @param {string} x string of number
   */
  private static toFixed(x: string) {
    return toWei(x);
  }

  /**
   * @dev converts a number from fixed point of 18 by dividing by 10e18
   * @param {string} x string of number
   */
  private static fromFixed(x: string) {
    return fromWei(x);
  }
}
