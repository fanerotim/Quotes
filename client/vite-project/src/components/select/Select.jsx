import styles from './Select.module.scss';
import { CATEGORIES } from '../../utils/genres';
import useCustomSelect from '../../hooks/useCustomSelect';

const Select = () => {

    const { 
        dropdownToggleHandler, 
        isDropdownOpen,
        choice,
        updateChoice 
    } = useCustomSelect();

    return (
        <>
            <div
                onClick={dropdownToggleHandler}
                className={styles.custom__select__container}
            >
                <p
                    className={styles.custom__select__choice__text}
                >
                    {choice}
                </p>

                {isDropdownOpen
                    ?
                    <span
                        className={styles.custom__select__choice__text__down__arrow}
                    >
                    </span>
                    :
                    <span
                        className={styles.custom__select__choice__text__up__arrow}
                    >
                    </span>}
            </div>

            <div
                className={
                    `${styles.custom__select__options__list__wrapper} 
                    ${isDropdownOpen ? styles.open : ''}`
                }
                onClick={(e) => updateChoice(e)}
            >
                {CATEGORIES.map(c =>
                    <p
                        key={c.value}
                        className={styles.custom__select__option}
                    >
                        {c.name}
                    </p>)
                }

            </div>
        </>
    )
}

export default Select;

