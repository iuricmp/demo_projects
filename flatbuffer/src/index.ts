import * as flatbuffers from 'flatbuffers';
import * as MyGame from './messages/my-game/sample'

const builder = new flatbuffers.Builder(1024);

let weaponOne = builder.createString('Sword');
let weaponTwo = builder.createString('Axe');

// Create the first `Weapon` ('Sword').
MyGame.Weapon.startWeapon(builder);
MyGame.Weapon.addName(builder, weaponOne);
MyGame.Weapon.addDamage(builder, 3);
let sword = MyGame.Weapon.endWeapon(builder);

// Create the second `Weapon` ('Axe').
MyGame.Weapon.startWeapon(builder);
MyGame.Weapon.addName(builder, weaponTwo);
MyGame.Weapon.addDamage(builder, 5);
let axe = MyGame.Weapon.endWeapon(builder);

// Create an array from the two `Weapon`s and pass it to the
// `createWeaponsVector()` method to create a FlatBuffer vector.
let weaps = [sword, axe];
let weapons = MyGame.Monster.createWeaponsVector(builder, weaps);

// Create a `vector` representing the inventory of the Orc. Each number
// could correspond to an item that can be claimed after he is slain.
let treasure = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let inv = MyGame.Monster.createInventoryVector(builder, treasure);

MyGame.Monster.startPathVector(builder, 2);
MyGame.Vec3.createVec3(builder, 1.0, 2.0, 3.0);
MyGame.Vec3.createVec3(builder, 4.0, 5.0, 6.0);
let path = builder.endVector();

// Serialize a name for our monster, called 'Orc'.
let name = builder.createString('Orc');

// Create our monster by using `startMonster()` and `endMonster()`.
MyGame.Monster.startMonster(builder);
MyGame.Monster.addPos(builder,
    MyGame.Vec3.createVec3(builder, 1.0, 2.0, 3.0));
MyGame.Monster.addHp(builder, 300);
MyGame.Monster.addColor(builder, MyGame.Color.Red)
MyGame.Monster.addName(builder, name);
MyGame.Monster.addInventory(builder, inv);
MyGame.Monster.addWeapons(builder, weapons);
MyGame.Monster.addEquippedType(builder,
    MyGame.Equipment.Weapon);
MyGame.Monster.addEquipped(builder, axe);
MyGame.Monster.addPath(builder, path);
let orc = MyGame.Monster.endMonster(builder);

builder.finish(orc);

let buf = builder.asUint8Array(); // Of type `Uint8Array`.

let bufIn = new flatbuffers.ByteBuffer(buf);
let monster = MyGame.Monster.getRootAsMonster(bufIn);

console.log(monster.hp()); // 100
console.log(monster.name()); // Orc
console.log(monster.mana()); // 10





