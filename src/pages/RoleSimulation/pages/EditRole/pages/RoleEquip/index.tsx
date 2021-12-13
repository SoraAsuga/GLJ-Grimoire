import { ENumericalNumber } from '@/constants/numericalValue';
import EquipChoiceCard from '@/pages/RoleSimulation/components/EquipChoiceCard';
import EquipDetailCard from '@/pages/RoleSimulation/components/EquipDetailCard';
import { equipsState } from '@/store/equips';
import { getRoleSelector } from '@/store/role-simulation';
import { EEquipmentLocation, EWeaponType, IEquipment } from '@/typings/equipment';
import {
  RocketOutlined,
  FileDoneOutlined,
  FileAddOutlined,
  StarOutlined,
  CheckOutlined,
  CopyOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
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
    location: EEquipmentLocation.BothHandWeapon,
    mainValueType: ENumericalNumber.WEAPON_ATK,
    mainValue: 0,
    allowedSecondaryWeapon: [
      EWeaponType.MagicDevice,
      EWeaponType.Knuckle,
      EWeaponType.Dagger,
      EWeaponType.Shield,
      EWeaponType.Arrow,
      EWeaponType.EmptyHanded,
      EWeaponType.NinjutsuScroll,
    ],
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
  const [currentEquipType, setCurrentEquipType] = useState([undefined, undefined]);

  /** 当前装备位置 */
  const [currentLocation, setCurrentLocation] = useState(undefined);

  /** 装备卡名称及其装备类型 */
  const type: IType[] = [
    {
      name: '主手武器',
      type: EEquipmentLocation.MainWeaponOnly,
      both: EEquipmentLocation.BothHandWeapon,
      location: 'mainWeapon',
    },
    {
      name: '副手武器',
      type: EEquipmentLocation.SecondaryWeaponOnly,
      both: EEquipmentLocation.BothHandWeapon,
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
  const changeShow =
    (type?: EEquipmentLocation, both?: EEquipmentLocation, location?: string) => () => {
      if (type) {
        console.log('gdx: ', location);
        setCurrentEquipType([type, both]);
        setCurrentLocation(location);
        setShow(!show);
      } else {
        console.log('gdx: ', location);
        setCurrentEquipType([type, both]);
        setCurrentLocation(location);
        setShow(!show);
      }
      setCurrentEquip(emptyHanded);
    };

  /** 将当前装备更新至 store */
  const changeEquipment = () => () => {
    const equipment = { ...role.equipment, [currentLocation]: currentEquip };
    setRole({ ...role, equipment });
    setShow(false);
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

  /** 动态生成装备条目 */
  const equipItem = () => {
    return equips.map((item) => (
      <button
        className="role-list_item"
        key={item.id}
        style={
          item.location === currentEquipType[0] || item.location === currentEquipType[1]
            ? currentEquip
              ? currentEquip.id === item.id
                ? { backgroundColor: '#4e8eee34' }
                : null
              : {}
            : { opacity: '0.4' }
        }
        onClick={changeCurrentEquip(item)}
      >
        <span className="role-list_item-name">
          <StarOutlined style={{ margin: '5px' }} />
          {item.name}
        </span>
        {item.refine && (
          <span className="role-list_item-container">
            <span className="role-list_item-type">+{item.refine}</span>
          </span>
        )}
      </button>
    ));
  };

  /** 动态生成装备卡 */
  const equipCard = () =>
    type.map((item) => {
      return (
        <EquipChoiceCard
          item={item}
          role={role}
          changeShow={changeShow}
          deleteCurrentEquip={deleteCurrentEquip}
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
        className="role-equip__list"
        getContainer={false}
      >
        <header className="role-equip__list-header">
          <div className="list-header__title">
            <RocketOutlined style={{ padding: '5px' }} className="list-header__title-icon" />
            <span className="list-header__title-text">装备清单</span>
          </div>
          <div className="list-header__menu">
            <button>
              <FileDoneOutlined className="btn-icon" />
              新增装备
            </button>
            <button>
              <FileAddOutlined className="btn-icon" />
              自定装备
            </button>
          </div>
        </header>
        <section className="role-equip__list-content">
          <div className="role-list">{equipItem()}</div>
          <div className="role-detail">
            <div className="role-detail_container">
              <EquipDetailCard item={currentEquip}></EquipDetailCard>
            </div>
          </div>
        </section>
        {currentEquip && (
          <section className="role-equip__list-footer">
            <button className="list-footer__btn">
              <CopyOutlined className="list-footer__btn-icon" />
              复制
            </button>
            <button className="list-footer__btn">
              <DeleteOutlined className="list-footer__btn-icon" />
              删除
            </button>
            <div className="list-footer__div"></div>
            {currentEquip.location === currentEquipType[0] ||
            currentEquip.location === currentEquipType[1] ? (
              <button className="list-footer__btn" onClick={changeEquipment()}>
                <CheckOutlined className="list-footer__btn-icon" />
                确认
              </button>
            ) : (
              <div className="list-footer__btn-error">
                <CheckOutlined className="list-footer__btn-icon" />
                确认
              </div>
            )}
          </section>
        )}
      </Modal>
    </section>
  );
};

export default RoleEquip;
