import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

export function useLocale() {
    const i18 = useI18n();
    const currentLocale = computed(() => {
        return i18.locale.value;
    });
    const changeLocale = (value: string) => {
        if (i18.locale.value === value) {
            return;
        }
        i18.locale.value = value;
        localStorage.setItem('locale', value);
    };
    const toggleZhEn = () => {
        if (i18.locale.value === 'en-US') {
            changeLocale('zh-CN');
        } else {
            changeLocale('en-US');
        }
    };
    return {
        currentLocale,
        changeLocale,
        toggleZhEn,
    };
}
