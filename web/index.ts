import { ParsedRequest, FileType } from '../api/_lib/types';
const { H, R, copee } = (window as any);
let timeout = -1;

interface ImagePreviewProps {
    src: string;
    onclick: () => void;
    onload: () => void;
    onerror: () => void;
    loading: boolean;
}

const ImagePreview = ({ src, onclick, onload, onerror, loading }: ImagePreviewProps) => {
    const style = {
        filter: loading ? 'blur(5px)' : '',
        opacity: loading ? 0.1 : 1,
    };
    const title = 'Click to copy image URL to clipboard';
    return H('a',
        { className: 'image-wrapper', href: src, onclick },
        H('img',
            { src, onload, onerror, style, title }
        )
    );
}

interface DropdownOption {
    text: string;
    value: string;
}

interface DropdownProps {
    options: DropdownOption[];
    value: string;
    onchange: (val: string) => void;
    small: boolean;
}

const Dropdown = ({ options, value, onchange, small }: DropdownProps) => {
    const wrapper = small ? 'select-wrapper small' : 'select-wrapper';
    return H('div',
        { className: wrapper },
        H('select',
            { className: 'border p-2 rounded', onchange: (e: any) => onchange(e.target.value) },
            options.map(o =>
                H('option',
                    { value: o.value, selected: value === o.value },
                    o.text
                )
            )
        ),
    );
}

interface TextInputProps {
    value: string;
    oninput: (val: string) => void;
}

const TextInput = ({ value, oninput }: TextInputProps) => {
    return H('div',
        { className: 'input-outer-wrapper' },
        H('div',
            { className: 'input-inner-wrapper' },
            H('input',
                { className: 'border p-2 rounded', type: 'text', value, oninput: (e: any) => oninput(e.target.value) }
            )
        )
    );
}

const TextAreaInput = ({ value, oninput }: TextInputProps) => {
    return H('div',
        { className: '' },
        H('div',
            { className: '' },
            H('textarea',
                { className: 'border p-2 rounded', value, oninput: (e: any) => oninput(e.target.value) }
            )
        )
    );
}

const NumberInput = ({ value, oninput }: TextInputProps) => {
    return H('div',
        { className: 'input-outer-wrapper' },
        H('div',
            { className: 'input-inner-wrapper' },
            H('input',
                { className: 'border p-2 rounded', type: 'number', value, oninput: (e: any) => oninput(e.target.value) }
            )
        )
    );
}

const URLInput = ({ value, oninput }: TextInputProps) => {
    return H('div',
        { className: 'input-outer-wrapper' },
        H('div',
            { className: 'input-inner-wrapper' },
            H('input',
                { className: 'border p-2 rounded', type: 'url', value, oninput: (e: any) => oninput(e.target.value) }
            )
        )
    );
}

interface FieldProps {
    label: string;
    input: any;
}

const Field = ({ label, input }: FieldProps) => {
    return H('div',
        { className: 'mb-4' },
        H('label', 
            H('div', {className: 'field-label'}, label),
            H('div', { className: 'field-value' }, input),
        ),
    );
}

interface ToastProps {
    show: boolean;
    message: string;
}

const Toast = ({ show, message }: ToastProps) => {
    const style = { transform:  show ? 'translate3d(0,-0px,-0px) scale(1)' : '' };
    return H('div',
        { className: 'toast-area' },
        H('div',
            { className: 'toast-outer', style },
            H('div',
                { className: 'toast-inner' },
                H('div',
                    { className: 'toast-message'},
                    message
                )
            )
        ),
    );
}

const fileTypeOptions: DropdownOption[] = [
    { text: 'PNG', value: 'png' },
    { text: 'JPEG', value: 'jpeg' },
];

interface AppState extends ParsedRequest {
    loading: boolean;
    showToast: boolean;
    messageToast: string;
    selectedImageIndex: number;
    widths: string[];
    heights: string[];
    overrideUrl: URL | null;
}

type SetState = (state: Partial<AppState>) => void;

const App = (_: any, state: AppState, setState: SetState) => {
    const setLoadingState = (newState: Partial<AppState>) => {
        window.clearTimeout(timeout);
        if (state.overrideUrl && state.overrideUrl !== newState.overrideUrl) {
            newState.overrideUrl = state.overrideUrl;
        }
        if (newState.overrideUrl) {
            timeout = window.setTimeout(() => setState({ overrideUrl: null }), 200);
        }

        setState({ ...newState, loading: true });
    };
    const {
        fileType = 'png',
        text = 'Đây là tít chính',
        subText = '',
        category = '',
        summary = '',
        score = '',
        image='https://d9n64ieh9hz8y.cloudfront.net/wp-content/uploads/20210723075128/dead-space-don-nhan-phien-ban-lam-lai-tin-game.jpg',
        showToast = false,
        messageToast = '',
        loading = true,
        overrideUrl = null,
    } = state;
    const url = new URL(window.location.origin);
    url.pathname = `${encodeURIComponent(text)}.${fileType}`;
    url.searchParams.append('subtext', subText);
    url.searchParams.append('category', category);
    url.searchParams.append('summary', summary);
    url.searchParams.append('score', score);
    url.searchParams.append('image', image);

    return H('div',
        { className: 'flex space-x-8' },
        H('div',
            { className: 'pull-left' },
            H('div',
                H(Field, {
                    label: 'Định dạng ảnh',
                    input: H(Dropdown, {
                        options: fileTypeOptions,
                        value: fileType,
                        onchange: (val: FileType) => setLoadingState({ fileType: val })
                    })
                }),
                H(Field, {
                    label: 'Tiêu đề',
                    input: H(TextAreaInput, {
                        value: text,
                        oninput: (val: string) => {
                            console.log('oninput ' + val);
                            setLoadingState({ text: val, overrideUrl: url });
                        }
                    })
                }),
                H(Field, {
                    label: 'Tiêu đề phụ',
                    input: H(TextInput, {
                        value: subText,
                        oninput: (val: string) => {
                            console.log('oninput ' + val);
                            setLoadingState({ subText: val, overrideUrl: url });
                        }
                    })
                }),
                H(Field, {
                    label: 'Danh mục',
                    input: H(TextInput, {
                        value: category,
                        oninput: (val: string) => {
                            console.log('oninput ' + val);
                            setLoadingState({ category: val, overrideUrl: url });
                        }
                    })
                }),
                H(Field, {
                    label: 'Đánh giá',
                    input: H(TextAreaInput, {
                        value: summary,
                        oninput: (val: string) => {
                            console.log('oninput ' + val);
                            setLoadingState({ summary: val, overrideUrl: url });
                        }
                    })
                }),
                H(Field, {
                    label: 'Điểm',
                    input: H(NumberInput, {
                        value: score,
                        oninput: (val: string) => {
                            console.log('oninput ' + val);
                            setLoadingState({ score: val, overrideUrl: url });
                        }
                    })
                }),
                H(Field, {
                    label: 'URL ảnh',
                    input: H(URLInput, {
                        value: image,
                        oninput: (val: string) => {
                            console.log('oninput ' + val);
                            setLoadingState({ image: val, overrideUrl: url });
                        }
                    })
                }),
            )
        ),
        H('div',
            { className: 'pull-right' },
            H(ImagePreview, {
                src: overrideUrl ? overrideUrl.href : url.href,
                loading: loading,
                onload: () => setState({ loading: false }),
                onerror: () => {
                    setState({ showToast: true, messageToast: 'Oops, an error occurred' });
                    setTimeout(() => setState({ showToast: false }), 2000);
                },
                onclick: (e: Event) => {
                    e.preventDefault();
                    const success = copee.toClipboard(url.href);
                    if (success) {
                        setState({ showToast: true, messageToast: 'Copied image URL to clipboard' });
                        setTimeout(() => setState({ showToast: false }), 3000);
                    } else {
                        window.open(url.href, '_blank');
                    }
                    return false;
                }
            })
        ),
        H(Toast, {
            message: messageToast,
            show: showToast,
        })
    );
};

R(H(App), document.getElementById('app'));
