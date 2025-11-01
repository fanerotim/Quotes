import styles from './Select.module.scss';
import { CATEGORIES } from '../../utils/genres';
import useCustomSelect from '../../hooks/useCustomSelect';
import { FaCheckSquare } from "react-icons/fa";

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
                    <div
                        className={styles.custom__select__option__container}
                    >
                        <p
                            key={c.value}
                            className={styles.custom__select__option}
                        >
                            {c.name}
                        </p>
                        
                        {choice === c.name
                            ?
                            <span
                                key={c.value}
                                className={styles.custom__select__react__icon__container}
                            >
                                <FaCheckSquare
                                    className={styles.custom__select__react__icon}
                                />
                            </span>
                            : ''}

                    </div>
                )
                }



            </div>
        </>
    )
}

export default Select;

