// js/ui/UIBuilder.js
export const STANDARD_KNOB_SIZE = 36;

/**
 * 创建节点外壳 (Header + Body)
 * @param {string} id - 节点 ID
 * @param {string} label - 主标题
 * @param {string} typeStr - 副标题 (如 VCO, VCF)
 * @param {string} widthClass - Tailwind 宽度类 (如 'min-w-[160px]')
 * @param {function} onContext - 右键菜单回调
 */
export function createNodeShell(id, label, typeStr, widthClass, onContext) {
    const div = document.createElement('div');
    div.className = `node-container bg-black ${widthClass} select-none group z-10`;
    div.id = id;

    div.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!div.classList.contains('selected')) {
            const all = document.querySelectorAll('.node-container.selected');
            all.forEach(n => n.classList.remove('selected'));
            div.classList.add('selected');
        }
        if (onContext) onContext(e);
    });

    const header = document.createElement('div');
    header.className = "bg-[#002200] border-b border-[#00FF00] h-5 flex justify-between items-center px-2 cursor-move header-drag-handle";
    header.innerHTML = `
        <span class="text-[9px] text-[#00FF00] font-bold font-arial uppercase tracking-wider pointer-events-none">${label}</span>
        <span class="text-[9px] text-[#005500] font-arial tracking-wider pointer-events-none">${typeStr}</span>
    `;

    div.appendChild(header);

    const body = document.createElement('div');
    body.className = "relative min-h-[62px] flex flex-col justify-center";
    div.appendChild(body);

    return { root: div, body };
}

/**
 * 创建端口
 */
export function createPort(parent, label, handleId, type, side, topPercent) {
    const isLeft = side === 'left';
    const wrapper = document.createElement('div');
    wrapper.className = `absolute flex items-center ${isLeft ? '-left-[5px]' : '-right-[5px]'}`;
    wrapper.style.top = topPercent;
    wrapper.style.flexDirection = isLeft ? 'row' : 'row-reverse';
    wrapper.style.transform = 'translateY(-50%)';
    wrapper.style.whiteSpace = 'nowrap';
    wrapper.style.zIndex = '50';

    const portDiv = document.createElement('div');
    portDiv.className = "port relative z-50";
    portDiv.dataset.handleid = handleId;
    portDiv.dataset.type = type;

    const text = document.createElement('span');
    text.className = `text-[9px] text-[#00FF00] font-arial uppercase leading-none ${isLeft ? 'ml-1 text-left' : 'mr-1 text-right'}`;
    text.style.paddingTop = '1px';
    text.innerText = label;

    wrapper.appendChild(portDiv);
    wrapper.appendChild(text);
    parent.appendChild(wrapper);
}

/**
 * 创建一个标准的居中控件行容器
 */
export function createControlRow(parent, className = "flex items-center justify-center pl-8 pr-8 py-2 gap-3") {
    const div = document.createElement('div');
    div.className = className;
    parent.appendChild(div);
    return div;
}