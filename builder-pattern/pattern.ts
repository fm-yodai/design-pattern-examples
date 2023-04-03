// code using builder pattern
// HouseBuilder is an abstract class
// House is a concrete class
// HouseBuilderDirector is a concrete class

// 複数作られるHouseインスタンスの全てを包含するフィールドとメソッドを持つ具象クラス
// 本例では、entotsuはオプショナルなフィールドとして定義している
class House {
  private _material: 'wood' | 'brick';
  private _floor: number;
  private _wall: number;
  private _roof: number;
  private _entotsu: boolean = false;

  constructor(material: 'wood' | 'brick') {
      this._material = material;
  }

  public setFloor(floor: number): void {
      this._floor = floor;
  }

  public setWall(wall: number): void {
      this._wall = wall;
  }

  public setRoof(roof: number): void {
      this._roof = roof;
  }

  public setEntotsu(): void {
      this._entotsu = true;
  }

  public getMaterial(): 'wood' | 'brick' {
      return this._material;
  }

  public getFloor(): number {
      return this._floor;
  }

  public getWall(): number {
      return this._wall;
  }

  public getRoof(): number {
      return this._roof;
  }

  public getEntotsu(): boolean {
      return this._entotsu;
  }
}

abstract class HouseBuilder {
  protected house: House;

  constructor(material: 'wood' | 'brick') {
      this.house = new House(material);
  }

  public abstract buildFloor(): HouseBuilder;
  public abstract buildWall(): HouseBuilder;
  public abstract buildRoof(): HouseBuilder;
  public abstract buildEntotsu(): HouseBuilder | void;

  public getHouse(): House {
      return this.house;
  }
}


class WoodenHouseBuilder extends HouseBuilder {

  constructor() {
      super('wood');
  }

  public buildFloor(): HouseBuilder {
      this.house.setFloor(1);
      return this
  }

  public buildWall(): HouseBuilder {
      this.house.setWall(4);
      return this
  }

  public buildRoof(): HouseBuilder {
      this.house.setRoof(1);
      return this
  }

  public buildEntotsu(): void {}
}

class BrickHouseBuilder extends HouseBuilder {

  constructor() {
      super('brick');
  }

  public buildFloor(): HouseBuilder {
      this.house.setFloor(2);
      return this
  }
  
  public buildWall(): HouseBuilder {
      this.house.setWall(8);
      return this
  }

  public buildRoof(): HouseBuilder {
      this.house.setRoof(1);
      return this
  }

  public buildEntotsu(): void {}
}

class BrickHouseWithEntotsuBuilder extends BrickHouseBuilder {
  public buildFloor(): HouseBuilder {
      this.house.setFloor(1);
      return this
  }
  
  public buildWall(): HouseBuilder {
      this.house.setWall(8);
      return this
  }
  
  public buildRoof(): HouseBuilder {
      this.house.setRoof(2);
      return this
  }
  
  public buildEntotsu(): HouseBuilder {
      this.house.setEntotsu();
      return this
  }
}

// 具象builderクラスに命令を出すクラス
class HouseBuilderDirector {
  private houseBuilder: HouseBuilder;

  constructor(houseBuilder: HouseBuilder) {
      this.houseBuilder = houseBuilder;
      return this
  }

  public buildHouse(): HouseBuilder {
      return this.houseBuilder
          .buildFloor()
          .buildWall()
          .buildRoof();
  }

  public buildHouseWithEntotsu(): HouseBuilder {
      this.houseBuilder.buildEntotsu();
      return this.buildHouse();
  }

  public getHouse(): House {
      return this.houseBuilder.getHouse();
  }
}

const woodenHouseBuilder = new WoodenHouseBuilder();
const brickHouseBuilder = new BrickHouseBuilder();
const brickHouseWithEntotsuBuilder = new BrickHouseWithEntotsuBuilder();

const woodenHouseBuilderDirector = new HouseBuilderDirector(woodenHouseBuilder);
const brickHouseBuilderDirector = new HouseBuilderDirector(brickHouseBuilder);
const brickHouseWithEntotsuBuilderDirector = new HouseBuilderDirector(brickHouseWithEntotsuBuilder);

const woodenHouse = woodenHouseBuilderDirector.buildHouse().getHouse();
const brickHouse = brickHouseBuilderDirector.buildHouse().getHouse();
const brickHouseWithEntotsu = brickHouseWithEntotsuBuilderDirector.buildHouse().getHouse();

console.log(woodenHouse);
console.log(brickHouse);
console.log(brickHouseWithEntotsu);

// Output
// House { _floor: 1, _wall: 4, _roof: 1, _entotsu: false }
// House { _floor: 2, _wall: 8, _roof: 1, _entotsu: false }
// House { _floor: 1, _wall: 8, _roof: 2, _entotsu: true }