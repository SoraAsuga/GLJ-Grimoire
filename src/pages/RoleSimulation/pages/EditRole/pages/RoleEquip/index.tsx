import ForgingCrystalCard from '@/components/ForgingCrystalCard';
import {
  ENumericalNumber,
  FORGING_CRYSTAL,
  FORGING_TYPE,
  SECONDARY_WEAPON_ALLOWED_MAP,
} from '@/components/numericalValue';
import EquipChoiceCard from '@/pages/RoleSimulation/components/EquipChoiceCard';
import EquipDetailCard from '@/pages/RoleSimulation/components/EquipDetailCard';
import { equipsState } from '@/store/equips';
import { getRoleSelector } from '@/store/role-simulation';
import { EEquipmentLocation, EWeaponType, IEquipment, IXtal } from '@/typings/equipment';
import { RocketOutlined, StarOutlined, CheckOutlined } from '@ant-design/icons';
import Modal from 'antd/lib/modal/Modal';
import React, { FC, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { IProps } from '../types';

import './index.less';

export interface IType {
  /** 标签名 */
  name: string;
  /** 装备类型 */
  type: EEquipmentLocation;
  /** 是否双手可用 */
  both?: EEquipmentLocation;
  /** 装备位置 */
  location: string;
}

const RoleEquip: FC<IProps> = (props) => {
  /** 空手装备 */
  const emptyHanded: IEquipment = {
    id: 'empty-handed',
    name: '空',
    weaponType: EWeaponType.EmptyHanded,
    location: EEquipmentLocation.MainWeapon,
    mainValueType: ENumericalNumber.WEAPON_ATK,
    mainValue: 0,
  };
  const { id } = props;
  /** 当前角色数据 */
  const roleSelector = useMemo(() => getRoleSelector(id), [id]);
  const [role, setRole] = useRecoilState(roleSelector);

  /** 装备弹窗 */
  const [show, setShow] = useState(false);

  /** 装备库数据 */
  const equips = useRecoilValue(equipsState);

  /** 当前装备 */
  const [currentEquip, setCurrentEquip] = useState(emptyHanded);

  /** 当前装备类型 */
  const [currentEquipLocationType, setCurrentEquipLocationType] = useState(undefined);

  /** 当前装备位置 */
  const [currentLocation, setCurrentLocation] = useState(undefined);

  /** 锻晶菜单展示 */
  const [showXtal, setShowXtal] = useState(false);

  /** 当前锻晶 */
  const [currentXtal, setCurrentXtal] = useState(FORGING_CRYSTAL[0]);

  /** 当前编辑锻晶装备类型 */
  const [currentXtalEquip, setCurrentXtalEquip] = useState({
    weaponType: EWeaponType.OneHandedSword,
    xtalLocation: 'xtal1',
    weaponLocation: EEquipmentLocation.MainWeapon,
  });

  /** 改变当前编辑锻晶装备类型 */
  const changeCurrentXtalEquip = (
    type: EWeaponType,
    location: 'xtal1' | 'xtal2',
    weaponLocation: EEquipmentLocation,
  ) => {
    setCurrentXtalEquip({ weaponType: type, xtalLocation: location, weaponLocation });
  };

  /** 装备卡名称及其装备类型 */
  const type: IType[] = [
    {
      name: '主手武器',
      type: EEquipmentLocation.MainWeapon,
      location: 'mainWeapon',
    },
    {
      name: '副手武器',
      type: EEquipmentLocation.SecondaryWeapon,
      location: 'secondaryWeapon',
    },
    { name: '身体防具', type: EEquipmentLocation.ArmorEquip, location: 'armorEquip' },
    { name: '追加装备', type: EEquipmentLocation.AdditionalEquip, location: 'additionalEquip' },
    { name: '特殊装备', type: EEquipmentLocation.SpecialEquip, location: 'specialEquip' },
    { name: '时装一', type: EEquipmentLocation.FashionEquip, location: 'fashionEquip1' },
    { name: '时装二', type: EEquipmentLocation.FashionEquip, location: 'fashionEquip2' },
    { name: '时装三', type: EEquipmentLocation.FashionEquip, location: 'fashionEquip3' },
  ];

  /** 装备选择页面，改变当前装备信息 */
  const changeShow = (type?: EEquipmentLocation, location?: string) => () => {
    if (type) {
      setCurrentEquipLocationType(type);
      setCurrentLocation(location);
      setShow(!show);
    } else {
      setCurrentEquipLocationType(type);
      setCurrentLocation(location);
      setShow(!show);
    }
    setCurrentEquip(emptyHanded);
  };

  /** 将当前装备更新至 store */
  const changeEquipment = () => {
    const equipment = { ...role.equipment, [currentLocation]: currentEquip };
    setRole({ ...role, equipment });
    setShow(false);
  };

  /** 将当前锻晶更新至 store */
  const changeXtal = () => {
    if (currentXtalEquip.xtalLocation === 'xtal1') {
      const xtal1 = {
        ...role.equipment[currentXtalEquip.weaponLocation],
        xtal1: currentXtal,
      };
      console.log('test1:', { ...role.equipment[currentXtalEquip.weaponLocation], xtal1 });
      // setRole({ ...role.equipment[currentXtalEquip.weaponLocation], xtal1 });
    } else {
      const xtal2 = {
        ...role.equipment[currentXtalEquip.weaponLocation],
        xtal2: currentXtal,
      };
      console.log('test2:', { ...role.equipment[currentXtalEquip.weaponLocation], xtal2 });
      // setRole({ ...role.equipment[currentXtalEquip.weaponLocation], xtal2 });
    }
    // setRole({ ...role, equipment });
    setShowXtal(false);
  };

  /** 改变当前装备及装备位置 */
  const changeCurrentEquip = (item: IEquipment) => () => {
    setCurrentEquip(item);
  };

  /** 删除当前装备中的装备 */
  const deleteCurrentEquip = (item: IType) => () => {
    const equipment = { ...role.equipment, [item.location]: emptyHanded };
    setRole({ ...role, equipment });
  };

  /** 动态生成装备选择菜单装备条目 */
  const equipItem = () => {
    return equips.map((item) => {
      const typeJudge = () => {
        if (currentEquipLocationType === EEquipmentLocation.SecondaryWeapon) {
          if (
            SECONDARY_WEAPON_ALLOWED_MAP[role.equipment.mainWeapon.weaponType].some(
              (allowedItem) => item.weaponType === allowedItem,
            )
          ) {
            if (currentEquip === item) {
              return { backgroundColor: '#4e8eee34' };
            }
            return {};
          }
        } else if (item.location === currentEquipLocationType) {
          if (currentEquip === item) {
            return { backgroundColor: '#4e8eee34' };
          }
          return {};
        }
        return { opacity: '0.4' };
        // return { backgroundColor: '#4e8eee34' };
      };

      if (item.name !== '空') {
        return (
          <button
            className="role-list_item"
            key={item.id}
            style={typeJudge()}
            onClick={changeCurrentEquip(item)}
          >
            <span className="role-list_item-name">
              <StarOutlined style={{ margin: '5px' }} />
              {item.name}
            </span>
          </button>
        );
      }
    });
  };

  /** 动态生成锻晶条目 */
  const xtalItem = () => {
    return FORGING_CRYSTAL.map((item) => {
      const typeJudge = () => {
        if (
          currentXtalEquip &&
          FORGING_TYPE[item.type].type.some(
            (allowedType) => currentXtalEquip.weaponType === allowedType,
          )
        ) {
          if (currentXtal === item) {
            return { backgroundColor: '#4e8eee34' };
          }
          return {};
        }
        return { opacity: '0.4' };
      };

      return (
        <button
          className="role-list_item"
          key={item.name}
          style={typeJudge()}
          onClick={() => setCurrentXtal(item)}
        >
          <span className="role-list_item-name">
            <StarOutlined style={{ margin: '5px' }} />
            {item.name}
          </span>
        </button>
      );
    });
  };

  /** 动态生成装备选择菜单确认按钮 */
  const weaponOkButton = () => {
    if (currentEquipLocationType === EEquipmentLocation.SecondaryWeapon) {
      if (
        SECONDARY_WEAPON_ALLOWED_MAP[role.equipment.mainWeapon.weaponType].some(
          (allowedItem) => currentEquip.weaponType === allowedItem,
        )
      ) {
        return (
          <button className="list-footer__btn" onClick={changeEquipment}>
            <CheckOutlined className="list-footer__btn-icon" />
            确认
          </button>
        );
      }
    } else if (
      currentEquipLocationType !== EEquipmentLocation.SecondaryWeapon &&
      currentEquip.location === currentEquipLocationType
    ) {
      return (
        <button className="list-footer__btn" onClick={changeEquipment}>
          <CheckOutlined className="list-footer__btn-icon" />
          确认
        </button>
      );
    }
    return (
      <div className="list-footer__btn-error">
        <CheckOutlined className="list-footer__btn-icon" />
        确认
      </div>
    );
  };

  /** 动态生成锻晶选择菜单确认按钮 */
  const xtalOkButton = () => {
    if (
      FORGING_TYPE[currentXtal.type].type.some(
        (allowedType) => allowedType === currentXtalEquip.weaponType,
      )
    ) {
      return (
        <button className="list-footer__btn" onClick={changeXtal}>
          <CheckOutlined className="list-footer__btn-icon" />
          确认
        </button>
      );
    }
    return (
      <div className="list-footer__btn-error">
        <CheckOutlined className="list-footer__btn-icon" />
        确认
      </div>
    );
  };

  /** 是否展示锻晶菜单 */
  const changeShowXtal = (show: boolean) => {
    setShowXtal(show);
  };

  /** 动态生成装备卡 */
  const equipCard = () =>
    type.map((item) => {
      return (
        <EquipChoiceCard
          key={item.name}
          item={item}
          role={role}
          changeShow={changeShow}
          deleteCurrentEquip={deleteCurrentEquip}
          showXtalList={changeShowXtal}
          changeXtalType={changeCurrentXtalEquip}
        />
      );
    });

  return (
    <section className="edit-role__page-equip">
      {equipCard()}
      <Modal
        visible={show}
        onCancel={changeShow()}
        footer={null}
        getContainer={false}
        className="role-equip__list"
      >
        <header className="role-equip__list-header">
          <div className="list-header__title">
            <RocketOutlined style={{ padding: '5px' }} className="list-header__title-icon" />
            <span className="list-header__title-text">装备清单</span>
          </div>
        </header>
        <section className="role-equip__list-content">
          <div className="role-list">{equipItem()}</div>
          <div className="role-detail">
            <div className="role-detail_container">
              <EquipDetailCard item={currentEquip} headerMenu={false}></EquipDetailCard>
            </div>
          </div>
        </section>
        {currentEquip && (
          <section className="role-equip__list-footer">
            <div className="list-footer__div"></div>
            {weaponOkButton()}
          </section>
        )}
      </Modal>
      <Modal
        className="role-equip__list"
        visible={showXtal}
        footer={null}
        getContainer={false}
        onCancel={() => setShowXtal(false)}
      >
        <header className="role-equip__list-header">
          <div className="list-header__title">
            <RocketOutlined style={{ padding: '5px' }} className="list-header__title-icon" />
            <span className="list-header__title-text">锻晶清单</span>
          </div>
        </header>
        <section className="role-equip__list-content">
          <div className="role-list">{xtalItem()}</div>
          <div className="role-detail">
            <div className="role-detail_container">
              <ForgingCrystalCard item={currentXtal}></ForgingCrystalCard>
            </div>
          </div>
        </section>
        {currentEquip && (
          <section className="role-equip__list-footer">
            <div className="list-footer__div"></div>
            {xtalOkButton()}
          </section>
        )}
      </Modal>
    </section>
  );
};

export default RoleEquip;
