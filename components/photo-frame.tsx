import Image from 'next/image';

import { CreditChip } from '@/components/illustrative-note';
import type { PhotoAsset } from '@/lib/images';
import { cn } from '@/lib/utils';

/** Where the licensing chip sits. Move it when the image carries a caption. */
type CreditPosition = 'bottom-left' | 'top-right';

type PhotoFrameProps = {
  image: PhotoAsset;
  priority?: boolean;
  sizes: string;
  className?: string;
  imageClassName?: string;
  /** Adds the slow cinematic scale on hover. */
  zoom?: boolean;
  showCredit?: boolean;
  creditPosition?: CreditPosition;
  /** Renders as a plain div when the parent element owns the semantics. */
  as?: 'div' | 'figure';
};

const CREDIT_POSITIONS: Record<CreditPosition, string> = {
  'bottom-left': 'absolute bottom-3 left-3 z-10',
  'top-right': 'absolute right-3 top-3 z-10',
};

export function PhotoFrame({
  image,
  priority = false,
  sizes,
  className,
  imageClassName,
  zoom = false,
  showCredit = true,
  creditPosition = 'bottom-left',
  as: Tag = 'div',
}: PhotoFrameProps) {
  return (
    <Tag className={cn('relative overflow-hidden bg-[var(--surface-sunken)]', className)}>
      {/* `fill` and `width`/`height` are mutually exclusive — the image is
          absolutely positioned inside the sized container, so `fill` + `sizes`
          is the correct combination. */}
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority={priority}
        sizes={sizes}
        quality={80}
        className={cn(
          'object-cover transition-transform duration-[1400ms] ease-editorial',
          zoom && 'group-hover:scale-[1.06] group-focus-within:scale-[1.06]',
          imageClassName,
        )}
      />
      {showCredit ? (
        <span className={CREDIT_POSITIONS[creditPosition]}>
          <CreditChip credit={image.credit} />
        </span>
      ) : null}
    </Tag>
  );
}